/**
 * ALICE Bookkeeping
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 *
 * NOTE: This class is auto generated by OpenAPI-Generator 5.0.0-beta2.
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/*
 * RunOrigin.h
 *
 * Type of creator.
 */

#ifndef ORG_OPENAPITOOLS_CLIENT_MODEL_RunOrigin_H_
#define ORG_OPENAPITOOLS_CLIENT_MODEL_RunOrigin_H_


#include "../ModelBase.h"


namespace org {
namespace openapitools {
namespace client {
namespace model {

class  RunOrigin
    : public ModelBase
{
public:
    RunOrigin();
    virtual ~RunOrigin();

    /////////////////////////////////////////////
    /// ModelBase overrides

    void validate() override;

    web::json::value toJson() const override;
    bool fromJson(const web::json::value& json) override;

    void toMultipart(std::shared_ptr<MultipartFormData> multipart, const utility::string_t& namePrefix) const override;
    bool fromMultiPart(std::shared_ptr<MultipartFormData> multipart, const utility::string_t& namePrefix) override;

    enum class eRunOrigin
    {
        RunOrigin_PROCESS,
    };

    eRunOrigin getValue() const;
    void setValue(eRunOrigin const value);

    protected:
        eRunOrigin m_value;
};

}
}
}
}

#endif /* ORG_OPENAPITOOLS_CLIENT_MODEL_RunOrigin_H_ */
