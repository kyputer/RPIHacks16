from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login', views.login),
    url(r'^logout', views.logout),
    url(r'^inventory', views.inventory),
    url(r'^entry', views.newEntry),
    url(r'^$', views.index, name='index'),
]
