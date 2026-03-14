from django.contrib import admin
from django.urls import path

from users.views import RegisterView,LoginView
from trees.views import PlantTreeView,MyTreesView
from payments.views import CreatePaymentView
from dashboard.views import DashboardView

urlpatterns = [

    path("admin/", admin.site.urls),

    path("api/register/",RegisterView.as_view()),
    path("api/login/",LoginView.as_view()),

    path("api/plant-tree/",PlantTreeView.as_view()),
    path("api/my-trees/",MyTreesView.as_view()),

    path("api/create-payment/",CreatePaymentView.as_view()),

    path("api/dashboard/",DashboardView.as_view())

]