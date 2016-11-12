from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.urls import reverse

# Create your views here.


def login(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('index'))
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse('index'))
    else:
        return render(request, "login.html", {"error": "Could not authenticate!"})


def signup(request):
    username = request.POST['username']
    password = request.POST['passowrd']
    email = request.POST['email']

    return render(request, "signup.html")


def logout(request):
    #logout
    return render(request, "index.html")


def index(request):
    return render(request, "index.html")


def inventory(request):
    return render(request, "inventory.html")


def newEntry(request):
    return render(request, "entry.html")
