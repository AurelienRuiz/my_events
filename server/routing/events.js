
module.exports = (app) => {
    const axios = require('axios');
    const config = require('./../config')[app.get('env')];

    // Event search
    app.get("/search", (req, res) => {
        let queryParams = searchParams(req.query);
        axios.get(`${config.api.eventful.host}events/search?${config.api.eventful.key}${queryParams}`)
        .then(response => {
            res.json(response.data);
        })
    });

    // get categories
    app.get("/category", (req, res) => {
        axios.get(`${config.api.eventful.host}categories/list?${config.api.eventful.key}&aliases=1`)
        .then(response => {
            res.json(response.data);
        })
    })

    // convert Lat/Lon to City
    app.get("/location", (req, res) => {
        axios.get(`${config.api.locationIQ.host}reverse.php?${config.api.locationIQ.key}&lat=${req.query.lat}&lon=${req.query.lon}`)
        .then(response => {
            res.json(response.data)
        })
    })
}

function searchParams(params)
{
    let queryParams = `&image_sizes=medium&page_number=${params.page}&date=Future&sort_order=date&include=price`;
    queryParams += params.location != "" ? `&location=${params.location}` : `&location=France`;

    if(params.category != "")
        queryParams += `&category=${params.category}`;
    return queryParams;
}