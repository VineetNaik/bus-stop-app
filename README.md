# TfL bus stop app

In preparation for my – hopefully – upcoming studies, I have been trying to program regularly, and learn and develop some new skills so that I don’t go into the course entirely cold.
Because I wanted to build something that was actually useful, I decided to create a simple site that effectively shows me the digital bus timetables for the two stops nearest my apartment. This idea seems to be a strong one, as it would be something I could actually use daily and is something that could potentially be built relatively quickly using commonplace techniques. It would also be quite easy to build upon the basics to create a more sophisticated website with greater functionality.

To start with, I simply wanted two tables showing the bus numbers, the directions of travel, and in how much time they would be arriving. The TFL (Transport for London) API provides all of this data by bus stop, so it would be a relatively simple case of pulling the data, sorting it appropriately and displaying it in a nice format.

This project involved the use of HTML, CSS, JavaScript to create the website itself, and also of Git to learn how version control works.

## Initial version

- HTML file initialises two tables (one for the bus stop where you can go towards central London, and the other for the southbound buses)
- JavaScript script that makes the API call, gets the data and sorts it, and then creates the table elements and adds it to the relevant table.
- CSS formatting file that gets the iconic TfL font, and formats the table/colours across the site.

## Note to self: using Git

While GitHub can be used entirely through the web-interface, most developers prefer using Git command line interface in order to commit code to codebases hosted on GitHub, as it provides more control.

First, we set up credentials and connect to remote (assuming you have already set up the repo on GitHub and have a local folder in which you have opened bash). The ```--global``` can be removed if this is for a specific repo.

```
$ git config --global user.name "Name"
$ git config --global user.email "username@gmail.com"
```

If we are cloning an existing repo, then we wouldn’t use ```$ git init``` or the following command, but rather ```$ git clone``` followed by the address of the repo. 

```
$ git init
$ git remote add origin https://github.com/username/project-repo.git
```

Stage the files – this is all local. ```$ git add``` takes modified files and puts them into the staging area (the “index”) – an intermediate state. This tells git that you are intending to commit these files. The ```add .``` command tells git that you intend to stage all changed files.
  
```
$ git add .
```

Commit the files – this changes what you have staged into an immutable snapshot in the repository history with a unique hash. The ```-m``` flag adds a message to indicate what has changed in this commit.  

```
$ git commit -m "Initial commit with project files"
```

Push to GitHub – here you define which branch you want to push to, and then actually push. The ```-M``` flag here is for renaming the current branch to main – only needed if the current branch is not main.

```
$ git branch -M main
$ git push origin main
```

## Creating a new branch for new features

I'll check first that I am on the main branch, and that it is up to date:

```
$ git checkout main
$ git pull origin main
```

Creating a new branch for new features:

```
$ git checkout -b new-features
```

Once changes are made, add and commit as usual

```
$ git add .
$ git commit -m "Added new tab"
```

Push the new branch into GitHub - only now will you see the new branch. This will not affect main

```
$ git push -u origin new-features
```

Once you wish to merge into main:

```
$ git checkout main
$ git pull origin main
$ git merge new-features
$ git push origin main
```

## Cloning and getting back into workflow

Navigate to the folder where the project is 

```
cd path/to/your/project_folder
```

Check that Git is already initialised and has a remote

```
$ git remote -v
```

and if not, run a re-link

```
$ git remote add origin https://github.com/username/project-repo.git
```

Check the status of the local repo (to see if there are any uncommitted changes)

```
$ git status
```

Ensure that you're synced with the remote ```main``` branch

```
$ git pull origin main
```

Then stage and commit changes with the usual ```add, comit, push``` sequence.