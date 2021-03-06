/**
 * API
 * ### REST  Routes is following REST standard (Richardson level 3)  <details><summary>Detailed specification</summary> <p>  **List:**   - `GET /<resources>/`     - Get the list of **<resources>** as admin   - `GET /user/<user_id>/<resources>/`     - Get the list of **<resources>** for a given **<user_id>**     - Output a **403** if logged user is not **<user_id>**  **Detail:**   - `GET /<resources>/<resource_id>`     - Get the detail for **<resources>** of id **<resource_id>**     - Output a **404** if not found   - `GET /user/<user_id>/<resources>/<resource_id>`     - Get the list of **<resources>** for a given **user_id**     - Output a **404** if not found     - Output a **403** if:       - Logged user is not **<user_id>**       - The **<user_id>** have no access to **<resource_id>**  **Creation / Edition / Replacement / Suppression:**   - `<METHOD>` is:     - **POST** for creation     - **PATCH** for update (one or more fields)     - **PUT** for replacement (all fields, not used)     - **DELETE** for suppression (all fields, not used)   - `<METHOD> /<resources>/<resource_id>`     - Create **<resources>** with id **<resource_id>** as admin     - Output a **400** if **<resource_id>** conflicts with existing **<resources>**   - `<METHOD> /user/<user_id>/<resources>/<resource_id>`     - Create **<resources>** with id **<resource_id>** as a given **user_id**     - Output a **409** if **<resource_id>** conflicts with existing **<resources>**     - Output a **403** if:       - Logged user is not **<user_id>**       - The **<user_id>** have no access to **<resource_id>** </p> </details>
 *
 * The version of the OpenAPI document: v1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.Api);
  }
}(this, function(expect, Api) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new Api.DefaultApi();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('DefaultApi', function() {
    describe('getFiles', function() {
      it('should call getFiles successfully', function(done) {
        //uncomment below and update the code to test getFiles
        //instance.getFiles(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('healthCheckerControllerCheck', function() {
      it('should call healthCheckerControllerCheck successfully', function(done) {
        //uncomment below and update the code to test healthCheckerControllerCheck
        //instance.healthCheckerControllerCheck(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
