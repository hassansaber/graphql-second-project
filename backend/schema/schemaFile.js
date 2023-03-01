// const { projects, clients } = require('../sampleData');
const { GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLList } = require('graphql');

// Mongoose Models
const Project = require('../models/Project');
const Client = require('../models/Client');




// Client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
})

// Project type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent) =>
        (Client.findById(parent.clientId))
      // (clients.find(client => client.id === parent.clientId))
    }
  })
})


// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // GET all clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return Client.find()
      }
    },
    // GET client bt ID
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(partent, args) {
        return Client.findById(args.id)
        // return clients.find(client => client.id === args.id)
      }
    },
    // GET all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => Project.find() //Mongoose
    },
    // GET project by ID
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) =>
        (Project.findById(args.id))
      // (projects.find(project => project.id === args.id))
    }

  }
})

// Mutations
const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {

    //  CLIENT

    // Add a Client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const { name, email, phone } = args
        const client = new Client({
          name,
          email,
          phone
        })
        return client.save()
      }
    },
    // Delete a Client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args) => {
        const { id } = args

        Project.find({ clientId: id }).then(
          projects => {
            projects.forEach(project => {
              project.remove()
            })
          }
        )

        const client = Client.findByIdAndDelete(id)
        return client
      }
    },
    // Update a Client
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const { id, name, email, phone } = args
        return Client.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              email,
              phone
            }
          },
          { new: true }
        )
      }
    },

    // PROJECT

    // Add a Project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              'new': { value: 'Not Started' },
              'progress': { value: 'In Progress' },
              'completed': { value: 'Completed' },
            }
          }),
          defaultValue: 'Not Started'
        },
        clientId: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args) => {
        const { name, description, status, clientId } = args
        Project.create({
          name,
          description,
          status,
          clientId
        }).then(result => {
          return result
        })
      }
    },
    // Delete a Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args) =>
        (Project.findByIdAndDelete(args.id))
    },
    // Update a Project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              'new': { value: 'Not Started' },
              'progress': { value: 'In Progress' },
              'completed': { value: 'Completed' },
            }
          })
        },
        clientId: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        const { id, name, description, status, clientId } = args;
        return Project.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              description,
              status,
              clientId
            }
          },
          { new: true }
        )
      }
    }
  }

})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})














