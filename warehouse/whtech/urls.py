from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login', views.signin, name='signin'),
    url(r'^logout', views.signout),
    url(r'^inventory', views.inventory),
    url(r'^entry', views.newEntry),
    url(r'^$', views.index, name='index'),
]
