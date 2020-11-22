public class DataAccess {

    public void add_main_data(
        int id 
        string description_name 
        DateTime when_joined 
        double bank_status 
        bool is_insured 
    )
    {
        add_main_data.ExecuteNonQuery(
            id 
            description_name 
            when_joined 
            bank_status 
            is_insured 
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