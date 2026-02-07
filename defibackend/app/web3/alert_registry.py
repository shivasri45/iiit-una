"""
Alert Registry
Manages on-chain alert creation
Blockchain used for AUDITABILITY, not computation
"""
from typing import Optional
from datetime import datetime
from app.web3.client import Web3Client
from config.settings import settings

# Simplified ABI for alert registry contract
ALERT_REGISTRY_ABI = [
    {
        "inputs": [
            {"name": "walletAddress", "type": "address"},
            {"name": "riskScore", "type": "uint256"},
            {"name": "txHash", "type": "bytes32"},
            {"name": "timestamp", "type": "uint256"}
        ],
        "name": "createAlert",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"name": "alertId", "type": "uint256"}],
        "name": "getAlert",
        "outputs": [
            {"name": "walletAddress", "type": "address"},
            {"name": "riskScore", "type": "uint256"},
            {"name": "timestamp", "type": "uint256"},
            {"name": "verified", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

class AlertRegistry:
    """
    On-chain alert registry
    Purpose: Immutable audit trail, not real-time computation
    """
    
    def __init__(self):
        self.web3_client = Web3Client()
        self.contract = None
        self._initialize_contract()
    
    def _initialize_contract(self):
        """
        Initialize smart contract instance
        Fails gracefully if contract unavailable
        """
        if not self.web3_client.is_connected():
            print("⚠️ Web3 not connected - alerts will be DB-only")
            return
        
        try:
            contract_address = settings.ALERT_REGISTRY_CONTRACT
            
            # For demo purposes, contract might not be deployed
            if not contract_address or contract_address == "0x...":
                print("ℹ️ Alert registry contract not configured")
                return
            
            self.contract = self.web3_client.w3.eth.contract(
                address=contract_address,
                abi=ALERT_REGISTRY_ABI
            )
            print(f"✅ Alert registry contract loaded at {contract_address}")
            
        except Exception as e:
            print(f"⚠️ Contract initialization error: {e}")
            self.contract = None
    
    async def create_alert(
        self,
        wallet_address: str,
        risk_score: float,
        tx_hash: str
    ) -> Optional[str]:
        """
        Create alert on-chain
        Args:
            wallet_address: wallet that triggered alert
            risk_score: calculated risk score (0-1)
            tx_hash: transaction hash
        Returns:
            transaction hash of alert creation or None
        """
        # Graceful degradation: if blockchain unavailable, continue
        if not self.contract or not self.web3_client.is_connected():
            print("ℹ️ Blockchain unavailable - alert stored in DB only")
            return None
        
        try:
            # Convert risk score to integer (multiply by 1000 for precision)
            risk_score_int = int(risk_score * 1000)
            
            # Convert tx_hash to bytes32
            tx_hash_bytes = bytes.fromhex(tx_hash.replace('0x', '').ljust(64, '0'))
            
            # Get current timestamp
            timestamp = int(datetime.utcnow().timestamp())
            
            # Get account
            account_address = self.web3_client.get_account()
            if not account_address:
                print("⚠️ No account configured for signing")
                return None
            
            # Build transaction
            transaction = self.contract.functions.createAlert(
                wallet_address,
                risk_score_int,
                tx_hash_bytes,
                timestamp
            ).build_transaction({
                'from': account_address,
                'nonce': self.web3_client.w3.eth.get_transaction_count(account_address),
                'gas': 200000,
                'gasPrice': self.web3_client.w3.eth.gas_price
            })
            
            # Sign transaction
            signed_txn = self.web3_client.w3.eth.account.sign_transaction(
                transaction,
                private_key=settings.PRIVATE_KEY
            )
            
            # Send transaction
            tx_hash_result = self.web3_client.w3.eth.send_raw_transaction(
                signed_txn.rawTransaction
            )
            
            print(f"✅ Alert created on-chain: {tx_hash_result.hex()}")
            return tx_hash_result.hex()
            
        except Exception as e:
            print(f"⚠️ On-chain alert creation failed: {e}")
            print("ℹ️ Alert will be stored in database only")
            return None
    
    async def get_alert(self, alert_id: int) -> Optional[dict]:
        """
        Retrieve alert from blockchain
        Args:
            alert_id: alert ID on-chain
        Returns:
            alert data or None
        """
        if not self.contract or not self.web3_client.is_connected():
            return None
        
        try:
            alert_data = self.contract.functions.getAlert(alert_id).call()
            
            return {
                "wallet_address": alert_data[0],
                "risk_score": alert_data[1] / 1000.0,  # Convert back from integer
                "timestamp": alert_data[2],
                "verified": alert_data[3]
            }
            
        except Exception as e:
            print(f"Error fetching alert {alert_id}: {e}")
            return None
    
    def is_available(self) -> bool:
        """Check if alert registry is available"""
        return self.contract is not None and self.web3_client.is_connected()