#!/bin/bash

# Mettre à jour le code source
git pull

# Construire l'image Docker
docker build --no-cache -t demospringboot .

# Arreter le conteneur existant
docker stop conteneur-spring-demo

# Supprimer le conteneur existant
docker rm conteneur-spring-demo

# Lancer un nouveau conteneur
docker run -d --name=conteneur-spring-demo -p 4200:80 demospringboot