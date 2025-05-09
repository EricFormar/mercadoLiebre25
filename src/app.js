const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const apiProductsRouter = require('./routes/apis/products.routes');
const apiSectionsRouter = require('./routes/apis/sections.routes');
const apiBrandsRouter = require('./routes/apis/brands.routes');
const apiCategoriesRouter = require('./routes/apis/categories.routes');
const apiSubCategoriesRouter = require('./routes/apis/subcategories.routes');
const apiCartRouter = require('./routes/apis/cart.routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({
    secret : 'miSecreto',
    resave : false,
    saveUninitialized : true
}));

app.use((req,res,next) => {
    res.locals.userLogin = req.session.userLogin
    next()
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);

/* APIS */
app.use('/api/products',apiProductsRouter);
app.use('/api/sections',apiSectionsRouter);
app.use('/api/brands', apiBrandsRouter);
app.use('/api/categories', apiCategoriesRouter);
app.use('/api/subcategories', apiSubCategoriesRouter);
app.use('/api/cart', apiCartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {    
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;