from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from . import views
from .views import current_user, is_admin, UserList

urlpatterns = [
    path('', views.ListProducto.as_view()),
    path('<int:pk>/', views.DetailProducto.as_view()),
    path('token-auth/', obtain_jwt_token),
    path('current_user/', current_user),
    path('is_admin/', is_admin),
    path('users/', UserList.as_view()),
    path('categories/', views.ListCategory.as_view()),
    path('category/<int:pk>/', views.DetailCategory.as_view()),
    path('category-top/', views.TopCategory.as_view()),
]
