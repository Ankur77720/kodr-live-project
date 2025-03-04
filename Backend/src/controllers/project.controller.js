const projectModel = require('../models/project.model');



module.exports.create = async (req, res) => {

    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Name is required'
        });
    }


    const project = await projectModel.create({
        name,
        code: " "
    })


    res.status(201).json({
        message: 'Project created successfully',
        data: project
    });

}


module.exports.list = async (req, res) => {
    const projects = await projectModel.find();

    res.status(200).json({
        projects
    });
}