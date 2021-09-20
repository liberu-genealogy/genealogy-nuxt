export default function ({store,route,redirect ,context}) {
  store.dispatch("loadRole")
	store.dispatch("loadPermission")
    .then(result => {
    	const authorizationLevels = route.meta.map((meta) => {
	    	return meta.permission.name
  		})
  		const permission =  store.state.permission
      	if(!permission.includes(authorizationLevels[0])) {
      		return redirect('/error')
      	}
    })
    .catch(error => {
      console.error("no");
    });
	
	
}