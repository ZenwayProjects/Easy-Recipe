const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());


app.listen(3001, () => {
    console.log("Server running on port 3001");
});

const db = mysql.createConnection({
    user: 'root',
    host:'localhost',
    password:'1525',
    database:'easyrecipe'
})


//Routes

//Admin pages
    //Create a new admin
    app.post("/api/adminRegister", (req, res) => {
        const userName = req.body.AdminName;
        const email = req.body.AdminEmail;
        const password = req.body.AdminPassword;

        const createAdminQ = "INSERT INTO administrators (userName, email, password) VALUES (?,?,?);";
        db.query(createAdminQ, [userName, email, password], (err, result) => {
            if(err){
                res.send("err");
            }
            else{
                res.send("good");
            }
        });
    });

    //Admin login
    app.get("/api/adminLogin", (req, res)=>{
        const adminEmail = req.query.email;
        const adminPassword = req.query.password;

        getAdminInfoQ = "SELECT * FROM administrators WHERE email = ? AND password = ?;"
        db.query(getAdminInfoQ, [adminEmail, adminPassword], (err, result) => {
            if(err){
                console.log(error);
            }
            else{
                res.send(result);
            }
        });
    });

    //Update administrators table once is logged in the system.
    app.put("/api/updateAdminStatus", (req, res) => {
        const email = req.body.email;
        const updateAdminStatusQ = "UPDATE administrators SET status = 1  WHERE email = ?";
        db.query(updateAdminStatusQ, [email], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });

    //Check if an admin is logged at the time
    app.get("/api/isAdminLogged", (req, res) => {
        const searchForLoggedAdmin = "SELECT administrators.email from administrators WHERE status = 1";
        db.query(searchForLoggedAdmin, (err, result) => {
            if(err){
                console.log(err);
            }
            else{   
                res.send(result);
            }
        });
    });

    //Update administrators table once the log out button is clicked;
    app.put("/api/logOutAdmin", (req, res) => {
        const email = req.body.email;
        const updateAdminStatusQ = "UPDATE administrators SET status = 0  WHERE email = ?";
        db.query(updateAdminStatusQ, [email], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });






















//Operations pages

    //Insert a new category
    app.post(("/api/createCategory"), (req, res) => {
        const categoryName = req.body.Name;
        const iconPath = req.body.IconPath;
        const createCategoryQ = "INSERT INTO categories (Name, IconPath) VALUES (?, ?);";
        db.query(createCategoryQ, [categoryName, iconPath],(err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });

    //Update category
    app.put(("/api/updateCategory"), (req, res) => {
        const categoryName = req.body.Name;
        const iconPath = req.body.IconPath;
        const categoryId = req.body.IdCategory;
        const updateCategoryQ = "UPDATE categories SET Name=?, IconPath=? WHERE IdCategory = ?";
        db.query(updateCategoryQ, [categoryName, iconPath, categoryId], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });

    //Delete category
    app.delete(("/api/deleteCategory/:IdCategory"), (req, res) => {
        const IdCategory = req.params.IdCategory;
        const deleteCategoryQ = "DELETE FROM categories where IdCategory = ?";
        db.query(deleteCategoryQ, [IdCategory], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });







    //get available foods for admin
    app.get(("/api/getAvailableFoods"), (req, res) => {
        const selectAvFoodsQ = "SELECT foods.IdFood, foods.Name, foods.IconPath, foods.IdCategory, categories.Name AS 'Category' FROM foods INNER JOIN categories ON foods.IdCategory = categories.IdCategory;"
        db.query(selectAvFoodsQ, (err, result) => {
            if(err){
                console.log(error);
            }
            else{
                res.send(result);
            }
        });
    });

    //Insert a new food
    app.post(("/api/createNewFood"), (req, res) => {
        const foodName = req.body.Name;
        const iconPath = req.body.IconPath;
        const categoryId = req.body.IdCategory;

        const insertFoodQ = "INSERT INTO foods (Name, IconPath, IdCategory) VALUES (?,?,?)"
        db.query(insertFoodQ, [foodName,iconPath,categoryId],(err, result) => {
            if(err){
                res.send("Error");
            }
            else{
                res.send(result);
            }
        })
    })

    //Update food
    app.put(("/api/updateFood"), (req, res) => {
        const foodId = req.body.id;
        const foodName = req.body.name;
        const iconPath = req.body.path;
        const categoryId = req.body.categoryId;

        const insertFoodQ = "UPDATE foods SET Name = ?, IconPath = ?, IdCategory = ? WHERE IdFood = ?"
        db.query(insertFoodQ, [foodName, iconPath, categoryId, foodId],(err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        })
    })

    //Delete foodsByRecipe and foods
    app.delete(("/api/deleteFood/:id"), (req, res) => {
        const foodId = req.params.id;
        const deleteFoodsByIdQ = "DELETE FROM foods where IdFood = ?";
        db.query(deleteFoodsByIdQ, foodId, (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });






    //get all recipes for admin
    app.get(("/api/getAllRecipes"), (req, res) =>{
        const selectRecipesQ = "SELECT * FROM recipes;"
        db.query(selectRecipesQ, (err,result) =>{
            if(err){
                console.log(error);
            }
            else{
                res.send(result);
            }
        });
    });

    //insert new recipe
    app.post(("/api/createRecipe"),(req, res) => {
        const recipeName = req.body.Name;
        const recipeIconPath = req.body.IconPath;
        const recipeGeneralDescription = req.body.GeneralDescription;
        const recipeNacionality = req.body.Nacionality;
        const recipeDifficulty = req.body.Difficulty;
        const recipeTime = req.body.Time;
        const recipeIngredientList = req.body.IngredientsList;
        const recipeContent = req.body.RecipeContent;
        const recipeUrl = req.body.Url;

        const insertRecipeQ = "INSERT INTO recipes (Name, IconPath, GeneralDescription, Nacionality, Difficulty, Time, IngredientsList, RecipeContent, Url) VALUES (?,?,?,?,?,?,?,?,?);";
        db.query(insertRecipeQ, [recipeName, recipeIconPath, recipeGeneralDescription, recipeNacionality, recipeDifficulty, recipeTime, recipeIngredientList, recipeContent, recipeUrl], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });


    app.put(("/api/updateRecipe"),(req, res) => {
        const recipeId = req.body.IdRecipe;
        const recipeName = req.body.Name;
        const recipeIconPath = req.body.IconPath;
        const recipeGeneralDescription = req.body.GeneralDescription;
        const recipeNacionality = req.body.Nacionality;
        const recipeDifficulty = req.body.Difficulty;
        const recipeTime = req.body.Time;
        const recipeIngredientList = req.body.IngredientsList;
        const recipeContent = req.body.RecipeContent;
        const recipeUrl = req.body.Url;

        const insertRecipeQ = "UPDATE recipes SET Name = ?, IconPath = ?, GeneralDescription = ?, Nacionality = ?, Difficulty = ?," 
        +"Time = ?, IngredientsList = ?, RecipeContent = ?, Url = ? WHERE IdRecipe = ?;";
        db.query(insertRecipeQ, [recipeName, recipeIconPath, recipeGeneralDescription, recipeNacionality, recipeDifficulty, recipeTime, recipeIngredientList, recipeContent, recipeUrl, recipeId], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });

    app.delete(("/api/deleteRecipe/:id"),(req, res) => {
        const recipeId = req.params.id;
        const insertRecipeQ = "DELETE FROM recipes WHERE IdRecipe = ?";
        db.query(insertRecipeQ, [recipeId], (err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });
























//User pages
    //Homepage
    app.get(("/api/getCategories" ),(req,res) => {
        const selectCategoryQ = "SELECT * FROM categories;";
        db.query(selectCategoryQ, (err, result) => {
            res.send(result);
        });
    });

    app.get(("/api/getFoods" ),(req,res) => {
        const selectFoodsQ = "SELECT * FROM foods;";
        db.query(selectFoodsQ, (err, result) => {
            res.send(result);
        });
    });


    //Possible recipes page
    app.get(("/api/getPossibleRecipesId"), (req, res) => {
        let foodsId = Object.values(req.query);
        const getRecipesIdQ = "SELECT IdRecipe FROM foodsbyrecipe WHERE IdFood = ?;"
        let finalResponse = [];

        foodsId.map((food, i) => {
            db.query(getRecipesIdQ, [food], (err, result) => {
                if(err){
                    console.log(err);
                }
                else{
                    finalResponse = [...finalResponse, result];
                    if(foodsId.length === i+1){
                        getRecipes(finalResponse, res)
                    }
                }
            });
        });
    });


    const getRecipes = (finalResponse, res) => {
        arrayIds = [];
        finalData = [];

        finalResponse.map((item, i) => {
            item.map((item2) => {
                arrayIds = [...arrayIds, item2.IdRecipe];
                arrayIds = arrayIds.filter((item3, index) => {
                    return arrayIds.indexOf(item3) === index;
                });
            });
            if(finalResponse.length === i+1){
                getFinalRecipes(arrayIds, res);
            }

        });
    }

    const getFinalRecipes = (arrayIds, res) => {

        const getRecipesQ = "SELECT Name, IconPath, GeneralDescription FROM recipes WHERE IdRecipe = ?;";
        let finalResponse = [];

        arrayIds.map((item, i) => {
            db.query(getRecipesQ, [item], (err,result) => {
                if(err){
                    console.log(err);
                }
                else{
                    finalResponse = [...finalResponse, result];

                    if(arrayIds.length === i+1){
                        res.send(finalResponse);
                    }
                }
            })
        })

    }


    //Selected recipe page
    app.get(("/api/selected-recipe"), (req, res) => {

        const Name = req.query.Name;   
        const selectRecipeQ = "SELECT * FROM recipes WHERE Name = ?;"
        
        db.query(selectRecipeQ, [Name],(err, result) => {
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        });
    });



