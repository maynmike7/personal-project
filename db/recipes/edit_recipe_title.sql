update user_recipes
set title = $1
where ur_id = $2;

select ur_id, user_id, recipe_img, title, ingredients, instructions from user_recipes
where ur_id = $2;