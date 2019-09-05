const createWorker = function(response) {
	const URL = window.URL || window.webkitURL;
	const blob = new Blob([response], { type: 'application/javascript' }); // eslint-disable-line
	const objectURL = URL.createObjectURL(blob);
	const worker = new Worker(objectURL); // eslint-disable-line
	URL.revokeObjectURL(objectURL);
	return worker;
};
export default class IWorker {
	response = 'var window = self;';
	set(func, name) {
		this.response += `${name ? 'self' + name + '=' : ''} self.${func.name} = ${func};`;
		return this;
	}
	import(url) {
		this.response += `importScripts('${url}');`;
		return this;
	}
	run(name) {
		let request = `self.onmessage  = function(e){self.postMessage(self.${name}.apply(self,e.data));self.close();};`;
		let worker = createWorker(this.response + request);
		return new Promise((resolve, reject) => {
			worker.onmessage = event => resolve(event.data);
			worker.onerror = reject;
			worker.postMessage(Array.prototype.splice.call(arguments, 1));
		});
	}
}
