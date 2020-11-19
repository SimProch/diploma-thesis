public Task<modelName> fetch_main_data(
)
{
    return fetch_main_data.ExecuteToObjects<modelName>(
    );
}

private static CommandDefinition fetch_main_data = CommandDefinition.DefineSp({
    "ui.fetch_main_data"
);