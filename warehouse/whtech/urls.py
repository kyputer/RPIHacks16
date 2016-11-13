from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^login', views.signin, name='signin'),
    url(r'^logout', views.signout, name='logout'),
    url(r'^signup', views.signup, name='signup'),
    url(r'^entry', views.newEntry, name='entry'),
    url(r'^analytics', views.analytics, name='analytics'),
    url(r'^$', views.index, name='index'),
]
