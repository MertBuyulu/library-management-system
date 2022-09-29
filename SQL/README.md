HOW TO GET A POSTGRES CONTAINER RUNNING TO WORK WITH THIS DATA?

1. INSTALL DOCKER DESKTOP

2. CD HERE and run 
docker build -t library-management-postgres-image .  

3. ensure image is there (should see that image name)
docker image ls -a

4. create a container out of that image 
docker run -d --name library-management-postgres-container -p 5430:5432 library-management-postgres-image

4. Use some form of data management software to view your data (I am using Azure Data Studio)

Feel free to reach out to Srilokh Karuturi for any trouble connecting





