"""
Inference Service
Core ML inference logic - separated from HTTP layer
This is the BRAIN 🧠 of the system
"""
import numpy as np
from typing import Dict, List
from app.ml.model_loader import ModelLoader
from app.schemas.models import PredictRequest
from config.settings import settings

class InferenceService:
    """
    Handles ML model inference
    Separation of concerns: Detection ≠ Decision
    """
    
    def __init__(self):
        self.model_loader = ModelLoader()
    
    def prepare_features(self, request: PredictRequest) -> np.ndarray:
        """
        Convert request to feature array in correct order
        Args:
            request: PredictRequest with transaction features
        Returns:
            numpy array with features in model-expected order
        """
        # Extract features in the EXACT order used during training
        features = [
            request.amount_usd,
            request.whale_tx,
            request.tx_count_user,
            request.rolling_volume_user
        ]
        
        # Convert to 2D array (required by sklearn)
        return np.array([features])
    
    def scale_features(self, features: np.ndarray) -> np.ndarray:
        """
        Scale features using pre-fitted scaler
        Args:
            features: raw feature array
        Returns:
            scaled feature array
        """
        # Validate before scaling
        self.model_loader.validate_features(features)
        
        # Apply scaling
        scaled = self.model_loader.scaler.transform(features)
        return scaled
    
    def predict_raw_score(self, scaled_features: np.ndarray) -> float:
        """
        Get raw anomaly score from model
        Args:
            scaled_features: scaled feature array
        Returns:
            raw anomaly score (higher = more anomalous)
        """
        # Isolation Forest returns negative scores
        # We negate to make higher = more risky
        raw_scores = self.model_loader.model.score_samples(scaled_features)
        risk_score = -raw_scores[0]  # Convert to positive, extract scalar
        
        return float(risk_score)
    
    def run_inference(self, request: PredictRequest) -> float:
        """
        Complete inference pipeline
        Args:
            request: transaction prediction request
        Returns:
            risk score (0-1 normalized)
        """
        # Step 1: Prepare features
        features = self.prepare_features(request)
        
        # Step 2: Scale features
        scaled_features = self.scale_features(features)
        
        # Step 3: Get raw score
        raw_score = self.predict_raw_score(scaled_features)
        
        # Step 4: Normalize to 0-1 range (using sigmoid-like transformation)
        # This makes scores more interpretable
        normalized_score = self._normalize_score(raw_score)
        
        return normalized_score
    
    def batch_inference(self, requests: List[PredictRequest]) -> List[float]:
        """
        Batch inference for multiple transactions
        More efficient than individual calls
        Args:
            requests: list of prediction requests
        Returns:
            list of risk scores
        """
        # Prepare all features at once
        features = np.vstack([self.prepare_features(req) for req in requests])
        
        # Scale batch
        scaled_features = self.model_loader.scaler.transform(features)
        
        # Predict batch
        raw_scores = -self.model_loader.model.score_samples(scaled_features)
        
        # Normalize all scores
        normalized_scores = [self._normalize_score(score) for score in raw_scores]
        
        return normalized_scores
    
    def _normalize_score(self, raw_score: float) -> float:
        """
        Normalize raw anomaly score to 0-1 range
        Uses sigmoid transformation for interpretability
        Args:
            raw_score: raw anomaly score
        Returns:
            normalized score (0-1)
        """
        # Sigmoid normalization: maps (-inf, inf) to (0, 1)
        # Adjust scaling factor based on your data distribution
        normalized = 1 / (1 + np.exp(-raw_score))
        return float(np.clip(normalized, 0, 1))
    
    def explain_features(self, request: PredictRequest) -> Dict[str, float]:
        """
        Feature importance for interpretability
        Args:
            request: prediction request
        Returns:
            dictionary mapping feature names to their values
        """
        return {
            "amount_usd": request.amount_usd,
            "whale_tx": request.whale_tx,
            "tx_count_user": request.tx_count_user,
            "rolling_volume_user": request.rolling_volume_user
        }