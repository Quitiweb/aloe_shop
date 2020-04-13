from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from . import views
from .views import current_user, UserList

urlpatterns = [
    path('', views.ListProducto.as_view()),
    path('<int:pk>/', views.DetailProducto.as_view()),
    path('token-auth/', obtain_jwt_token),
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]