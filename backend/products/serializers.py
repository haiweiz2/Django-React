from rest_framework import serializers
from products.models import ProductModel


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductModel
        fields = '__all__'
        extra_kwargs = {
            'image': {'required': False},
            'description': {'required': False},
        }

    def update(self, instance, validated_data):
        # Set partial=True to allow partial updates
        return super().update(instance, validated_data)
