# Gelt Mash

## Spec

So we are working on a MASH implementation, and therefore we need the following core concepts:

- Player writes mash categories. Traditionally: Wife, Kids, Job, Salary, Car etc. Each category has:
  - Four to Five options for each category
  - One of the options has to be BAD
- Randomisation to pick what number will be used to iterate over the options
  - Note that MASH on top also counts for that!
- When all things are crossed out in a category but one, circle that option
- Once everything is crossed out then the fortune is read out

## Thoughts

- Since we are doing this as a web application, we can add as many categories as we want
- Perhaps MASH on top should be treated like the other categories in a way
- I can throw in some CSS animations on the crossed out items, and emphasis on the remaining ones
- Randomisation can be done via a simple random number generator but we want to keep cycling it until the player presses the button to stop.

## Follow up questions

1. What additional features or improvements could be added to enhance the game experience?

   > This could be a fun setup for an RPG game, you basically roll your stats this way and what comes out of it is your character. Or maybe this could be a way to generate resources in a larger strategy game.

   > As for actual improvements to the MASH experience, assuming we have a large amount of resources we can add a visual and audio component to the game. Let's say you roll "Brick House" in the house category. A brick house and sound of falling bricks could be played.

2. How could AI be leveraged to make the game more engaging or personalized?
   > This one seems obvious when I read how the game is played normally. It is given that the worst option for each category is given to you by your friend, if you have no friend you could just ask AI to come up with it.
3. What infrastructure would be required to support AI-enhanced functionality?
   > Either a subscription to a commercial LLM with their own back end that you query via the client, the same thing but with an API middleman or a custom hosted LLM with own API backend. Either way the prompts would have to be engineered so that a single word answer is made, e.g. "I'm playing a fortune telling game of mash. Can you provide a single word that would be the worst thing that could be rolled in the house category?" when I asked that question to gemma:4b I got "Mud Let me know if you need another word! 😊", the AI technically obeyed the request but also added some couretsy response at the end that we don't need.
4. How would you ensure that any AI-generated content or recommendations are accurate and appropriate?
   > If a single word answer is expected, take only the first word from the response. This should help with any couretsy responses. Regarding them being appropriate, the prompt can be engineered further but there's always a risk of priming the answer that the AI will pick when a list of examples is given.
5. If users wanted to save and revisit their previous game results, how would you design this feature?
   > That depends. Do we want to make a simple solution? Browser local storage, local file storage with node.js or perhaps a very long URL. Do we need this accessible from another device? We can either provide a server for the user that they can host, or just do that ourselves and save the result in "the cloud". But with an online save we can reach the following problems: How do we know the game belongs to this particular user? Which game result do we need to fetch? Do we want it to be a simple name with game id, or do we want to make a ui to access all of the previous games and display them to the user. There are many answers to this particular question, and all of them have their advantages and disadvantages for both the end user and the developer of the application.

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
