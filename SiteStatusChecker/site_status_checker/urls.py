from django.urls import path
from site_status_checker import views

urlpatterns = [
    path("", views.default_check, name="default_check"),
    path("<url>", views.check_url, name="check_url"),
]