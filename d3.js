(function (global, factory) {
  (global = global), factory((global.d3 = global.d3 || {}));
})(this, function (exports) {
  "use strict";
     var xhtml = "http://www.w3.org/1999/xhtml";

     var namespaces = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: xhtml,
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/"
     };


   function namespace(name) {
      var prefix = name += "", 
      i = prefix.indexOf(":");
      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") 
     {
          name = name.slice(i + 1);
     }
      return namespaces.hasOwnProperty(prefix) 
          ? {space: namespaces[prefix], local: name}
          :  name; // eslint-disable-line no-prototype-builtins
   }


   function creatorInherit(name) {
      return function() {
         var document = this.ownerDocument,
            uri = this.namespaceURI;
         return uri === xhtml && document.documentElement.namespaceURI === xhtml
            ? document.createElement(name)
            : document.createElementNS(uri, name);
      };
   }
   function creatorFixed(fullname) {
      return function() {
         return this.ownerDocument.createElementNS(fullname.space, fullname.local);
      };
   }

   function creator(name) {
      var fullname = namespace(name);
      return (fullname.local
            ? creatorFixed
            : creatorInherit)(fullname);
   }

  function create(name) {
     return select(creator(name).call(document.documentElement));
  }
  

  exports.create = create;
  exports.select = select;
});
