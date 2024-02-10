<h6><p align="right">Created: April 2021</p></h6>

### Prerequisites  
For this program to work, Python (with accompanying pip installation), the Django framework, and the Requests library must be installed.
An example Django installation and environment setup guide has been provided below.  
Note:- This program was initially desgined to run on Windows, its fairly simple to run on other OS, and would need a little browsing on the net.

### Django Install/Setup  
1. On your file system, create a project folder with a suitable name, such as SiteStatusChecker.
2. Navigate to the folder in command prompt and run the following code:  
    ```
    py -3 -m venv .venv 
    .venv\scripts\activate  
    ```
3. Update pip in the virtual environment by running the following command in cmd:  
    ```
    python -m pip install --upgrade pip  
    ```
5. Install Django in the virtual environment by running the following command in cmd:  
    ```
    python -m pip install django  
    ```
6. Install Requests in the virtual environment by running the following command in cmd:  
    ```
    python -m pip install requests  
    ```
7. Run the following command in the same (venv) directory:  
    ```
    django-admin startproject web_project .  
    ```
8. Create an empty development database by running the following command:  
    ```
    python manage.py migrate  
    ```
9. Next, create the app folder holding the source code for this program with the following command:  
    ```
    python manage.py startapp site_status_checker  
    ```
10. Replace the contents of the *site_status_checker* folder just made with the corresponding contents of *site_status_checker* in this repository. A useful site for this purpose is https://download-directory.github.io/ , allowing you to download any section of a github repository.
11. Replace the contents of the file *urls.py* in SiteStatusChecker\web_project with the following code:  
    ```
    from django.contrib import admin
    from django.urls import include, path
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    urlpatterns = [
        path("", include("site_status_checker.urls")),
        path('admin/', admin.site.urls)
    ]

    urlpatterns += staticfiles_urlpatterns()
    ```  
12. Finally, in the web_project/settings.py file, locate the INSTALLED_APPS list and add the following entry, which makes sure the project knows about the app so it can handle templating:  
    ```
    'site_status_checker',  
    ```
13. To run the program, make sure the virtual enivronment is activated, and in the root (venv) directory, run:  
    ```
    python manage.py runserver
    ```  
    Now, the site can be accessed at the given server link, eg. http://127.0.0.1:8000/  
    To stop the program, press CTRL-C in cmd.
    
    
    
