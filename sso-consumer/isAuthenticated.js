const debug = require("debug")("app:isAuthenticated");

const isAuthenticated = (req, res, next) => {
	debug("============================================");
	debug(`checking if authenticated`);
	// simple check to see if the user is authenicated or not,
	// if not redirect the user to the SSO Server for Login
	// pass the redirect URL as current URL
	// serviceURL is where the sso should redirect in case of valid user
	const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
	debug(`the user is ${JSON.stringify(req.session.user)}`);
	if (req.session.user == null) {
		debug(
			`not authenticated. going to "http://devel:3010/simplesso/login?serviceURL=${redirectURL}"`
		);
		return res.redirect(
			`http://devel:3010/simplesso/login?serviceURL=${redirectURL}`
		);
	}
	next();
};

module.exports = isAuthenticated;
