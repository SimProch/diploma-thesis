[ApiController]
[Route(/* Controller Route Path */)]
[Authorize(/*Roles = ApplicationPermissions.Access*/)]
public class Controller: ApiController {

    [Route(/* Method Route Path */)]
    [Authorize(/* Roles = ApplicationPermissions.Edit */)]
    [HttpGet]
    public async Task<outputModel> controllerPath(
        Guid? cacheRevision,  
        CancellationToken cancellationToken 
    )
    {
        return fetch_main_data.ExecuteToCacheAsync<outputModel>(
            cacheRevision,  
            cancellationToken 
        );
    }
}