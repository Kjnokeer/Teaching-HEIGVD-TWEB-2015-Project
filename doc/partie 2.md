# TWEB Rapport partie 2


## Descriptif rapide des fonctionnalités prévues initialement

Il doit être possible de faire un questionnaire pour lequel des questions doivent être associées. Une fois le questionnaire terminé, une URL courte (min, maj, chiffres) doit être générée et peut être transmise aux personnes allant répondre.

Pour pouvoir créer un questionnaire il est nécessaire de créer un compte sur le site, pour répondre aux questions, il peut être possible d’utiliser son compte ou de répondre avec un compte temporaire (un champ d’identification).

Le questionnaire doit permettre de créer des questions des types suivants : 

-	Choix unique (radio-bouton)
-	Choix multiple (checkbox)
-	Réponse libre (text area)
	
Il doit être possible pour chaque question d’ajouter une description, insertion d’une image.
Les résultats associés aux questionnaires sont visible n’importe quand par le créateur du questionnaire, les réponses sont associées à une nouvelle URL qu’il peut partager avec les répondants. 

Les résultats sont affichés sous forme de graphiques si possible : pour les choix uniques sous forme d’un camembert, pour les choix multiple sous forme de barres.

## Ce qui a réellement été fait - connexion et dashboard

Depuis la page d'accueil, il est possible de se connecter avec un compte créé sur l'application. Il est possible de créer un compte pour ceux qui n'en possède déjà pas un.

Depuis le dashboard, on dispose d'un menu de navigation sur la gauche qui offre, actuellement, trois pages :

1. **Polls** - qui permet d'afficher la liste des sondages créés par l'utilisateur et permet également de créer un nouveau sondage en cliquant sur le bouton `Create a poll`.
2. **Statistics** - qui permet d'afficher les statistiques par sondage (en cliquant sur le bouton `Show statistics` du sondage correspondant).
3. **Manage account** - qui permet de modifier ses informations personnelles (nom, prénom, nouveau mot de passe).

L'affichage des statistiques par sondage affiche un seul graphique correspondant à une seule question. Pour voir le graphique des autres questions, il est nécessaire de cliquer sur les boutons `Next question` et `Previous question`.

Il est également possible de se déconnecter du site en cliquant succéssivement sur son e-mail (en haut à droite) puis sur `Sign out`.

## Ce qui a réellement été fait - réponse aux questions

Depuis la page d'accueil, il n'est pas possible d'accéder à la page permettant de répondre à un sondage. Il faut y accéder en inscrivant l'URL `http://localhost:3000/audience` dans la barre de navigation.

Cette page propose deux champs texte, le premier correspond au numéro du sondage auquel on veut répondre. Le deuxième champs correspond au pseudo que avec lequel on pourra répondre au sondage.

Une fois ces deux champs remplis, le sondage est proposé, question par question.

Un message est affiché lorsque le sondage est termnié.

## Par rapport au descriptif rapide des fonctionnalités prévues

Si on regarde ce qui avait été défini au départ, certaines fonctionnalités n'ont pas pu être implémentées.

On peut faire les commentaires suivants :

- D'une fois que le sondage est crée, aucune URL n'est générée permettant de répondre simplement au sondage
	- Il est nécessaire de saisir à la main, l'identifient du sondage.
- Pour répondre aux questions, il était initialement prévu de devoir disposer d'un compte sur le site. Cette option n'a pas été implémentée. Lorsque l'on veut répondre à un sondage, il faut simplement fournir un pseudo.
- Lors de la création d'un sondage, il devait être possible de créer des questions à choix unique, à choix multiple ou des réponses libres. Actuellement, il n'est possible de créer uniquement des sondages avec des questions à choix unique.
- Il était initialement prévu de pouvoir ajouter une description ainsi qu'une image pour une question. Il n'est possible que d'ajouter un titre ainsi que les différentes réponses possibles.

## Problèmes restants

Il existe encore quelques problèmes au niveau de l'application. On peut citer pour la réponse aux sondages :

- Il est nécessaire de saisir à la main le numéro du sondage (`Poll number`), ce qui est ennuyant et source d'erreurs.
- Si on ne remplit pas le champs `Poll number` et qu'on clique sur le bouton `Continue`, aucune erreur n'est affichée.
- Si on n'entre pas de pseudo, aucune erreur n'est affichée. On peut répondre au questionnaire mais sa participation ne sera pas prise en compte.
- Il est possible de passer à la prochaine question sans avoir au prélable coché une des réponses proposées.

Concerant le dashboard :

- Il n'est pas possible de modifier un sondage après qu'il soit crée.
- Il est possible de créer des sondages sont réponses (seul le titre est requis).
- Si le status du sondage n'est pas fourni lors de la création (`Active` ou `Closed`), il ne sera pas affiché dans la liste des sondages.
- Si on affiche les statistiques d'un sondage ne contenant pas de réponses, aucun message d'information n'est affiché à l'utilisateur pour le prévenir. 
- Le status du sondage n'a aucune influence. Il est toujours possible d'y répondre même en étant dans l'état `Closed`.
