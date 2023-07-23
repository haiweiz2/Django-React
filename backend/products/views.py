from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ProductModel
from .serializers import ProductSerializer
from rest_framework.permissions import AllowAny


class ProductAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk=None):
        if pk is not None:
            try:
                product = ProductModel.objects.get(pk=pk)
                serializer = ProductSerializer(product)
                return Response(serializer.data)
            except ProductModel.DoesNotExist:
                return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            products = ProductModel.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "Created!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            product = ProductModel.objects.get(pk=pk)
        except ProductModel.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Updated!'}, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            product = ProductModel.objects.get(pk=pk)
            product.delete()
            return Response({'message': 'Product deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except ProductModel.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)
