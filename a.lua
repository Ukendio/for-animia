memory:UpdateAsync("RunningGames", function(old)
                                if old ~= nil then
                                    old[reservedCode] = 
                                        {
                                            ["full"] = #values == Service.PlayerRange.Max;
                                            ["skillLevel"] = skillLevel;
                                            ["players"] = userIds;
                                            ["started"] = false;
                                            ["joinable"] = #values ~= Service.PlayerRange.Max;
                                            ["ratingType"] = ratingType;
                                        }
                                    return old
                                else
                                    return 
                                        {
                                            [reservedCode] = 
                                            {
                                                ["full"] = #values == Service.PlayerRange.Max;
                                                ["skillLevel"] = skillLevel;
                                                ["players"] = userIds;
                                                ["started"] = false;
                                                ["joinable"] = #values ~= Service.PlayerRange.Max;
                                                ["ratingType"] = ratingType;
                                            }
                                        }
                                end
                            end, 86400)