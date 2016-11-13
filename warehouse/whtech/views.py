from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse

from . import models
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
            return render(request, "login.html", {"error": "Username or password incorrect."})
    return render(request, "login.html")


def signup(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        password2 = request.POST['password2']
        first = request.POST['first']
        last = request.POST['last']
        email = request.POST['email']
        if password != password2:
            return render(request, "signup.html", {'match': "Passwords do not match."})
        try:
            user = User.objects.create_user(username, email=email, password=password)
        except:
            return render(request, "signup.html", {'error': "Account already exists"})
        user.first_name = first
        user.last_name = last
        if user is None:
            return render(request, "signup.html", {'error': "There was an error while creating your account."})
        user.save()
        login(request, user)
        return HttpResponseRedirect(reverse('index'))
    return render(request, "signup.html")


def signout(request):
    if request.user.is_authenticated:
        logout(request)
    return HttpResponseRedirect(reverse('index'))


def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('signin'))

    if request.method == "GET":
        try:
            action = request.GET['action']
            itemno = int(request.GET['itemno'])
            try:
                if action == "+":
                    inst = models.Item.objects.get(pk=itemno)
                    inst.count += 1
                    inst.save()
                else:
                    inst = models.Item.objects.get(pk=itemno)
                    inst.count -= 1
                    inst.save()
            except:
                return HttpResponseRedirect(reverse('index'))
        except:
            pass
    return render(request, "index.html", {'name': request.user.first_name})


def newEntry(request):
    return render(request, "entry.html")

"""
        if request.GET["no"] is not None:
            try:
                no = request.GET["no"]
                cost = request.GET["cost"]
                inst = models.Item.objects.create(itemno=no, itemname="default", cost=10, count=1)
                inst.save()
            except:
                inst = models.Item.objects.filter(pk=no)
                if len(inst) >= 1:
                    inst = models.Item.objects.get(pk=no)
                    inst.count += 1
                    inst.save()
            return render(request, "index.html", {'name': request.user.first_name})
"""