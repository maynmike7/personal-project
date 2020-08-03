select ur.recipe_img, ur.title, ur.ingredients, ur.instructions from user_recipes ur
join ll_users lu on ur.user_id = lu.user_id
where lu.user_id = $1;