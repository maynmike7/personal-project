insert into user_recipes (
    user_id, 
    recipe_img, 
    title, 
    ingredients, 
    instructions
) values (
    $1, 
    $2, 
    $3, 
    $4, 
    $5
);