# Roll-Em

### The goal of this project is to create a game that I used to play called Roll-Em.

My problem statement is: The game Roll-Em is a relatively simple game to make, yet it is not very popular and there is no online version of this game available and I would like for me and my family to be able to play this game with just a link.

In this game there is two dice and a block of wood with pins. There are numbers 1-10 corrosponding with those pins. In this game whatever number is rolled the player can remove the pins adding up to the number the player rolls. The goal is to remove the most amount of pins you can before you cannot remove any more.

For example, if the player rolls a 5, the player can remove a variety of combonations of pins. 2 and 3, 4 and 1, or just 5. If a player rolls an 8 they can remove 5 and 3, 6 and 2, 7 and 1, or just 8.

The player loses when no more pins can be pulled after a dice roll.

For example, if the player has pins left in 3 and 5, and the player rolls a 9. No combonation of the remaining pins can equal that dice roll. Therefore the player would run out of moves and they would lose.

If the player manages to remove every single pin on the board they win.

This application should be ready to use upon launch but if not try clicking refresh or check your internet connection.

The color of the pins are randomly cycled through blue, red, and green. The dice have a default appearance until the "Roll Dice" button is pressed, then each of the dice inner text should change to a "randomly" generated dice face. The combination of these two numbers is the amount that the pulled pins must add up to.

User will not have to pull both pins. For example, if a 9 is rolled and the user clicks on the pin associated with the number 7, the pin associated with the number 2 will be pulled as well.

When the user rolls and cannot click any more pins, an alert will appear that displays "Close! Only (the remaining number of pins) pins left"

When the user is able to remove all pins from the block of wood, an alert will appear that displays "You Win!"

At either of these screens a "Try Again" button will appear which should reset the dice as well as the buttons to be visible again. The alert displayed should be hidden as well.

I used an API called api.quotable.io in this project to display a motivational quote at the top of the page when the "Try Again" screen is displayed to keep the user with a fighting spirit! The quote should dissapear when the "Try Again" button is pressed.

This game can be played with a friend in two different ways.

Two users on different devices can play at the same time and see who has the least amount of pins left at the end of each round. Score can be kept based on who wins each round.

Two users on the same device can take turns playing and whoever ends up with the least amount of pins left after each user has gone, the winner is kept in the score and a new round starts.

https://trello.com/b/FjYQw7xv/roll-em