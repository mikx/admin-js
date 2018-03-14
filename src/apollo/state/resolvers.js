const resolvers = {
    Mutation: {
        changeShowType: (_, {show_type}, {cache}) => {
            cache.writeData({
                data: {
                    show_type
                }
            });
            return {
                show_type, __typename: "ShowType"
            }
        },
    }
};

export default resolvers;
