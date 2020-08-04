insert into user_recipes (
    user_id,
    recipe_img,
    title,
    ingredients,
    instructions
) values (
    ${userId},
    ${recipeImg},
    ${title},
    ${ingredients},
    ${instructions}
);