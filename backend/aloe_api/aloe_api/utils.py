def my_jwt_response_handler(token, user=None, request=None):
    from backend.aloe_api.aloe_shop.serializers import UserSerializer
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }