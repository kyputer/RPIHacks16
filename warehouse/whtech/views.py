from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse

# Create your views here.


def signin(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('index'))
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('index'))
        else:
            return render(request, "login.html", {"error": "Could not authenticate!"})
    return render(request, "login.html")


def signup(request):
    username = request.POST['username']
    password = request.POST['passowrd']
    email = request.POST['email']

    return render(request, "signup.html")


def signout(request):
    if request.user.is_authenticated:
        logout(request)
    return HttpResponseRedirect(reverse('index'))


def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('signin'))
    return render(request, "index.html", {'name': request.user.username})


def inventory(request):
    return render(request, "inventory.html")


def newEntry(request):
    return render(request, "entry.html")
