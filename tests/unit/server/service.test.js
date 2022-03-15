import { jest, expect, describe, test, beforeEach } from "@jest/globals"
import config from "../../../server/config"
import TestUtil from "../_util/testUtil"
import { Service } from "../../../server/service"
import fs from "fs"
import fsPromise from "fs/promises"
import { join } from "path"

const {
  pages,
  dir: { publicDirectory },
} = config

describe("#Service", () => {
  const service = new Service()

  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test("getFileInfo - should return a file info", async () => {
    const filename = pages.homeHTML
    const nameExpected = join(publicDirectory, filename)
    const expectedResult = { type: ".html", name: nameExpected }

    const result = await service.getFileInfo(pages.homeHTML)

    expect(result).toEqual(expectedResult)
  })

  test("getFileStream - should return a file stream", async () => {
    const mockFileStream = TestUtil.generateReadableStream(["data"])
    const expectedResult = { type: ".html", stream: mockFileStream }

    jest.spyOn(fs, "createReadStream").mockReturnValue(mockFileStream)
    jest
      .spyOn(Service.prototype, Service.prototype.getFileInfo.name)
      .mockClear()

    const result = await service.getFileStream(pages.homeHTML)

    expect(result).toEqual(expectedResult)
    expect(Service.prototype.getFileInfo).toBeCalledTimes(1)
    expect(Service.prototype.getFileInfo).toBeCalledWith(pages.homeHTML)
    expect(fs.createReadStream).toBeCalledTimes(1)
  })
})
