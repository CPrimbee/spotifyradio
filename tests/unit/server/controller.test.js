import { jest, expect, describe, test, beforeEach } from "@jest/globals"
import config from "../../../server/config"
import TestUtil from "../_util/testUtil"
import { Controller } from "../../../server/controller"
import { Service } from "../../../server/service"

const { pages } = config

describe("#Controller", () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test(`getFileStream - should return a file stream`, async () => {
    const controller = new Controller()
    const expectedType = ".html"
    const mockFileStream = TestUtil.generateReadableStream(["data"])

    jest
      .spyOn(Service.prototype, Service.prototype.getFileStream.name)
      .mockResolvedValue({
        stream: mockFileStream,
        type: expectedType,
      })

    const result = await controller.getFileStream(pages.homeHTML)

    expect(Service.prototype.getFileStream).toBeCalledWith(pages.homeHTML)
    expect(result).toStrictEqual({
      stream: mockFileStream,
      type: expectedType,
    })
  })
})
