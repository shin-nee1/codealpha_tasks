import random

def choose_word():
    words = {
        "python": "A popular programming language",
        "hangman": "A classic word-guessing game",
        "software": "Programs and operating information used by a computer",
        "engineering": "The application of science and mathematics to solve problems",
        "intellij": "A popular IDE for Java development",
        "developer": "A person who creates software applications"
    }
    word, hint = random.choice(list(words.items()))
    return word.lower(), hint

def display_word(word, guessed_letters):
    return " ".join([letter if letter in guessed_letters else "_" for letter in word])

def hangman():
    print("Welcome to Hangman!")
    choice = input("Do you want to enter your own word? (yes/no): ").strip().lower()
    
    if choice == "yes":
        word = input("Enter your word: ").strip().lower()
        hint = input("Enter a hint for the word: ")
    else:
        word, hint = choose_word()
    
    guessed_letters = set()
    attempts = 6
    
    hangman_stages = [
        """
         ----
         |  |
         |  O
         | /|\\
         | / \\
        _|_
        """,
        """
         ----
         |  |
         |  O
         | /|\\
         | /
        _|_
        """,
        """
         ----
         |  |
         |  O
         | /|\\
         |
        _|_
        """,
        """
         ----
         |  |
         |  O
         | /|
         |
        _|_
        """,
        """
         ----
         |  |
         |  O
         |  |
         |
        _|_
        """,
        """
         ----
         |  |
         |  O
         |
         |
        _|_
        """,
        """
         ----
         |  |
         |
         |
         |
        _|_
        """
    ]
    
    while attempts > 0:
        print(hangman_stages[attempts])
        print("\nWord:", display_word(word, guessed_letters))
        print(f"Attempts left: {attempts}")
        
        if attempts <= 3:
            print(f"Hint: {hint}")
        
        guess = input("Guess a letter: ").lower()
        
        if len(guess) != 1 or not guess.isalpha():
            print("Invalid input. Please enter a single letter.")
            continue
        
        if guess in guessed_letters:
            print("You already guessed that letter.")
            continue
        
        guessed_letters.add(guess)
        
        if guess in word:
            print("Good job! That letter is in the word.")
            if all(letter in guessed_letters for letter in word):
                print("\nCongratulations! You guessed the word:", word)
                break
        else:
            attempts -= 1
            print("Wrong guess! Try again.")
    else:
        print(hangman_stages[0])
        print("\nGame over! The word was:", word)

if __name__ == "__main__":
    hangman()
