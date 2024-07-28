import app from "./app";
import config from './utils/config';

app.listen(config.PORT, () => {
    console.log(`Server running on PORT ${config.PORT}`);
});

app.get('/', (request, response) => {
    response.status(200).send(request.user);
});