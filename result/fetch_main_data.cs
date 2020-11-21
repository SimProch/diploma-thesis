public class DataAccess {

    public Task<ICacheableData<IDbMultiResult<modelName>>> fetch_main_data(
        Guid? cacheRevision,  
        CancellationToken cancellationToken 
    )
    {
        return fetch_main_data.ExecuteToCacheAsync<modelName>(
            cacheRevision,  
            cancellationToken 
        );
    }

    private static CommandDefinition fetch_main_data = CommandDefinition.DefineSp({
        "ui.fetch_main_data"
    );
}