"""
ML Model Loader
Loads pre-trained models and scalers for inference ONLY
❌ No retraining
❌ No mutation
✅ Only inference
"""
import joblib
import numpy as np
from pathlib import Path
from typing import Optional
from config.settings import settings

class ModelLoader:
    """
    Singleton model loader
    Models are trained offline and frozen for production
    """
    _instance: Optional['ModelLoader'] = None
    _model = None
    _scaler = None
    
    def __new__(cls):
        """Singleton pattern - one model instance across app"""
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
            cls._instance._load_models()
        return cls._instance
    
    def _load_models(self):
        """Load model and scaler from disk"""
        try:
            model_path = Path(settings.MODEL_PATH)
            scaler_path = Path(settings.SCALER_PATH)
            
            if not model_path.exists():
                raise FileNotFoundError(f"Model not found at {model_path}")
            if not scaler_path.exists():
                raise FileNotFoundError(f"Scaler not found at {scaler_path}")
            
            self._model = joblib.load(model_path)
            self._scaler = joblib.load(scaler_path)
            
            print(f"✅ Model loaded from {model_path}")
            print(f"✅ Scaler loaded from {scaler_path}")
            
        except Exception as e:
            print(f"❌ Error loading models: {e}")
            raise
    
    @property
    def model(self):
        """Get the loaded model (read-only)"""
        return self._model
    
    @property
    def scaler(self):
        """Get the loaded scaler (read-only)"""
        return self._scaler
    
    def validate_features(self, features: np.ndarray) -> bool:
        """
        Validate feature array shape
        Args:
            features: numpy array of features
        Returns:
            True if valid, raises ValueError otherwise
        """
        expected_features = len(settings.FEATURE_NAMES)
        
        if features.ndim != 2:
            raise ValueError(f"Features must be 2D array, got {features.ndim}D")
        
        if features.shape[1] != expected_features:
            raise ValueError(
                f"Expected {expected_features} features, got {features.shape[1]}"
            )
        
        return True
    
    def get_model_info(self) -> dict:
        """
        Get model metadata
        Returns:
            Dictionary with model information
        """
        return {
            "model_type": type(self._model).__name__,
            "model_version": settings.MODEL_VERSION,
            "feature_count": len(settings.FEATURE_NAMES),
            "feature_names": settings.FEATURE_NAMES,
            "scaler_type": type(self._scaler).__name__
        }