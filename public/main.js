// Focus div based on nav button click

// Flip one coin and show coin image to match result when button clicked

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button

const coin = document.getElementById("singlenav")
// Add event listener for coin button
			coin.addEventListener("click", flipCoin)
			function flipCoin() {
                fetch('http://localhost:5000/app/flip/', {mode: 'cors'})
  				.then(function(response) {
    			  return response.json();
  				})
				.then(function(result) {
					console.log(result);
					document.getElementById("single").innerHTML = result.flip + '<br><img src="./assets/img/' + result.flip + '.png" class="smallcoin">';
					document.getElementById("single").setAttribute("class", "active");
                    document.getElementById("home").setAttribute("class", "hidden");
                    document.getElementById("multi").setAttribute("class", "hidden");
                    document.getElementById("guess").setAttribute("class", "hidden");
				})
//				let flip = "FLIPPED"
//				document.getElementById("coin").innerHTML = flip;
//				console.log("Coin has been flipped. Result: "+ flip)
			}

const home = document.getElementById("homenav")
            home.addEventListener("click", displayInstructions)
            function displayInstructions() {
                document.getElementById("home").innerHTML = "how to play:<br>press each button to flip one coin, many coins, or guess the result of a coin flip.<br>press home to display instructions.";
                document.getElementById("home").setAttribute("class", "active");
                document.getElementById("single").setAttribute("class", "hidden");
                document.getElementById("multi").setAttribute("class", "hidden");
                document.getElementById("guess").setAttribute("class", "hidden");
            }