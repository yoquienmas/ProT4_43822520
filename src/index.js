import express from 'express';
import morgan from 'morgan';

const app = express();

app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.json());

app.listen(app.get('port'), () => {
 console.log(`Server on port ${app.get('port')}`);

})