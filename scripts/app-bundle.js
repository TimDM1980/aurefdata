define('app',['exports', './kantoor', '../../aurefdata/src/referentiedataRequester'], function (exports, _kantoor, _referentiedataRequester) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.heading = "Referentiedata opzoeken";
      this.responsebody = 'hier komt de response body';
      this.kantoorcode = '';
    }

    App.prototype.zoeken = function zoeken() {
      if (this.kantoorcode) {
        this.responsebody = 'komtie: ' + new _referentiedataRequester.ReferentiedataRequester().getKantoren(this.kantoorcode);
        this.kantoorcode = '';
      }
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('../../aurefdata/src/httprequest',['exports', 'aurelia-fetch-client'], function (exports, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HttpRequest = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var HttpRequest = exports.HttpRequest = function () {
    function HttpRequest() {
      _classCallCheck(this, HttpRequest);

      this.url = "";
      this.response = null;
      this.client = new _aureliaFetchClient.HttpClient().configure(function (config) {
        config.useStandardConfiguration().withBaseUrl('http://localhost:8080/Referentiedata/');
      });
    }

    HttpRequest.prototype.get = function get(path) {
      var response = {};
      this.client.fetch(path).then(function (response) {
        return response.json();
      }).then(function (body) {
        response.body = body;
      });
      return response;
    };

    HttpRequest.prototype.getWithParams = function getWithParams(path, pathParams) {
      return this.get(path + "/" + pathParams);
    };

    HttpRequest.prototype.getWithQueryParams = function getWithQueryParams(path, queryParams) {
      return this.get(path + "?" + queryParams + "&insz=&contactGroep=&taal=NEDERLANDS&userId=&domeinObject=kantoor");
    };

    HttpRequest.prototype.post = function post(path, bodyJson) {
      this.client.fetch(path, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyJson)
      });
    };

    HttpRequest.prototype.delete = function _delete(path, pathParams) {
      this.client.fetch(path + "/" + pathParams, {
        method: 'delete'
      });
    };

    HttpRequest.prototype.put = function put(path, pathParams, bodyJson) {
      var _client$fetch;

      this.client.fetch(path + "/" + pathParams, (_client$fetch = {
        method: 'put',
        body: bodyJson,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }, _client$fetch['body'] = JSON.stringify(bodyJson), _client$fetch));
    };

    return HttpRequest;
  }();
});
define('kantoor',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Kantoor = exports.Kantoor = function Kantoor(kantoorcode) {
        _classCallCheck(this, Kantoor);

        this.kantoorcode = kantoorcode;
    };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('../../aurefdata/src/referentiedataRequester',["exports", "./httprequest"], function (exports, _httprequest) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ReferentiedataRequester = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ReferentiedataRequester = exports.ReferentiedataRequester = function () {
    function ReferentiedataRequester() {
      _classCallCheck(this, ReferentiedataRequester);

      this.httpRequest = new _httprequest.HttpRequest();
    }

    ReferentiedataRequester.prototype.getKantoren = function getKantoren(kantoorcode) {
      var querystring = "kantoorCode=" + kantoorcode;
      return this.httpRequest.getWithQueryParams("lookup", querystring);
    };

    return ReferentiedataRequester;
  }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${heading}</h1>\n\n  <form submit.trigger=\"zoeken()\">\n    <label>KantoorCode</label>\n    <input type=\"text\" value.bind=\"kantoorcode\">\n    <button type=\"submit\">Zoeken</button>\n  </form>\n\n  ${responsebody}\n\n  dit kan nooit werken in combinatie met LookupServlet.\n  We schrijven nl de zoekresultaten als attributes op de REQUEST weg.\n  de lookup.jsp heeft scriptlet tags die die request attributes uitlezen.\n  Hoe kan dit werken??? scriptlet tags werken SERVER SIDE, dus die kan daar aan.\n  Via JS kunnen we nooit meer aan dat request object aan, maw ik moet een REST gateway opzetten.\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map