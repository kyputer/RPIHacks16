from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template

# Create your views here.

def login(request):
    return render(request, "login.html")


def logout(request):
    #logout
    return render(request, "index.html")


def index(request):
    return render(request, "index.html")


def inventory(request):
    return render(request, "inventory.html")


def newEntry(request):
    return render(request, "entry.html")
