import { getUsers,getUser,createPost,updateComment, deletePost} from "../controllers/entity controller.js";
 import { login,register,loginRequired } from "../controllers/authentication controller.js";

const routes = (app) => {
    //entity routes
    app.route('/entity')
        .get( loginRequired,getUsers)
        .post( loginRequired,createPost);

    app.route('/entity/:id')
        .put( loginRequired,updateComment)
        .get(loginRequired, getUser)
        .delete(loginRequired, deletePost);

    // authentication bay
    app.route('/auth/register')
        .post(register);

    app.route('/auth/login')
        .post(login);


};
export default routes;