const handleAxiosErrors = (error, setAlertMessage, setAlertSeverity) => {
	setAlertSeverity('error');

	if (error.request) {
		console.log('--AXIOS REQUEST ERROR--');
		console.log(error.request);

		if (error.response) {
			console.log('--AXIOS RESPONSE ERROR--');
			console.log(error.response);

			if ('data' in error.response) {
				if ('data' in error.response.data) {
					return setAlertMessage(error.response.data.data.message);
				}

				if ('error' in error.response.data) {
					setAlertMessage(error.response.data.error.message);
				}

				return setAlertMessage(error.response.data.message);
			}

			return setAlertMessage('Sever responded with unknown error');
		}

		return setAlertMessage('Server is not reachable');
	}

	if ('data' in error.response) {
		if ('data' in error.response.data) {
			return setAlertMessage(error.response.data.data.message);
		}

		if ('error' in error.response.data) {
			setAlertMessage(error.response.data.error.message);
		}

		return setAlertMessage(error.response.data.message);
	}

	return setAlertMessage('Sever responded with unknown error');
};

export default handleAxiosErrors;
