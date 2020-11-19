public class DataAccess { 
    public Task<ICacheableData<IDbMultiResult<modelName>>> add_main_data(
        int id,  
        string description_name,  
        DateTime when_joined,  
        double bank_status,  
        bool is_insured,  
        Guid? cacheRevision,  
        CancellationToken cancellationToken 
    )
    {
        return add_main_data.ExecuteToCacheAsync<modelName>(
            id,  
            description_name,  
            when_joined,  
            bank_status,  
            is_insured,  
            cacheRevision,  
            cancellationToken 
    );
    }

    private static CommandDefinition add_main_data = CommandDefinition.DefineSp({
        "ui.add_main_data"
        "@id", SqlDbType.Int
        "@description_name", SqlDbType.VarChar, 255,
        "@when_joined", SqlDbType.DateTime
        "@bank_status", SqlDbType.Float
        "@is_insured", SqlDbType.Bit
    );
}